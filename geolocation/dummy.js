// Import necessary libraries
import dotenv from "dotenv";
import express from "express";
import CryptoJS from "crypto-js";
import requestIp from "request-ip";
// import fetch from "node-fetch"; // Make sure you have installed node-fetch
// import AllContextProvider from "../(filter)/all-context";
// import { useEffect } from "react";

// Initialize dotenv to use .env file variables
dotenv.config();

// Retrieve API keys from environment variables
const access_key = process.env.access_key;
const secret_key = process.env.secret_key;
const app = express();

// API request details
const requestMethod = "GET";
const hostName = "https://geolocation.apigw.ntruss.com";
const requestUrl = "/geolocation/v2/geoLocation";
const timeStamp = Math.floor(+new Date()).toString();

// Trust the proxy to correctly retrieve the client's IP
app.set("trust proxy", true);

// Function to convert IPv4-mapped IPv6 addresses to IPv4
function extractIPv4(ipv6) {
  const ipv4MappedIPv6Regex = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
  const match = ipv6.match(ipv4MappedIPv6Regex);
  return match ? match[1] : ipv6;
}

// Middleware to get the client IP address and convert IPv6 to IPv4 if applicable
app.use(requestIp.mw());
app.use((req, res, next) => {
  req.clientIp = extractIPv4(req.clientIp);
  req.realIp = extractIPv4(req.clientIp);
  next();
});

// Function to generate the API signature
function makeSignature(secretKey, method, baseString, timestamp, accessKey) {
  const space = " ";
  const newLine = "\n";
  let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(
    [method, space, baseString, newLine, timestamp, newLine, accessKey].join("")
  );
  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

  
    // Main function to setup the endpoint and handle location requests
    async function getLocation() {
      app.post("/location", async (req, res) => {
        const clientIp = req.locals.realIp; // This is now in IPv4 format if it was IPv4-mapped IPv6
        const sortedSet = {
          ip: clientIp,
          ext: "t",
          responseFormatType: "json",
        };

        let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
          return prev + curr + "=" + sortedSet[curr] + "&";
        }, "");
        queryString = queryString.slice(0, -1);

        const baseString = requestUrl + "?" + queryString;
        const signature = makeSignature(
          secret_key,
          requestMethod,
          baseString,
          timeStamp,
          access_key
        );

        const headers = {
          "x-ncp-apigw-timestamp": timeStamp,
          "x-ncp-iam-access-key": access_key,
          "x-ncp-apigw-signature-v2": signature,
        };

        try {
          const response = await fetch(
            `${hostName}${requestUrl}?${queryString}`,
            {
              method: "GET",
              headers: headers,
            }
          );
          const data = await response.json();

          res.json(data); // Send the API response to the client
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      });
    }
// Initialize the location function and start the server
getLocation();
app.listen(3000, () => console.log('Server running on port 3000'));
