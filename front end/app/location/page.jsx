import Link from 'next/link';
import React, { useRef } from 'react';
import hyperClovaX from '../(HyperClovaX)/hyperclova';

export default async function GetLocation() {
  const inputRef = useRef();
  

  return (
    <div>
      <h1>Option</h1>
      <form action={hyperClovaX.Location(inputRef.current.value.trim())}>
      <input type="text" ref={inputRef} placeholder="지역을 입력하세요...(예시: 부산 대연동)"/>
      <Link href="/main">    
      <button >확인</button>
      </Link>
      </form>
    </div>
  );
}



