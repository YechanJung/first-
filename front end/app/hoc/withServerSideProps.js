// hoc/withServerSideProps.js
import React from 'react';
import requestIp from 'request-ip';

export function withServerSideProps(WrappedComponent) {
  const WithServerSideProps = (props) => {
    return <WrappedComponent {...props} />;
  };

  WithServerSideProps.getInitialProps = async (ctx) => {
    const ip = ctx.req ? requestIp.getClientIp(ctx.req) : null;
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    console.log(ip);
    return { ...componentProps, ip };
  };

  return WithServerSideProps;
}