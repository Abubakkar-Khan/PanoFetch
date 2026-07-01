const axios = require('axios');

async function test() {
  const lh3Url = "https://lh3.googleusercontent.com/gpms-cs-s/ABJJf51vpbRyVQKuCFfJac8Hzn5pI4A5NBdcH4lLTJwTIzitGC9vzMtMXYVM10oLwey1IjO1J-xXSmOJ5g7i4g2WFoZQN1IW3IRI1o15riYbJoJPMfsYMQz-0OACJ8Tfuvh5MUNP6pHuyg";
  
  try {
    const res = await axios.get(`${lh3Url}=s0`);
    console.log("Success with s0:", res.status, res.data.length);
  } catch (err) {
    console.error("Failed with s0:", err.response ? err.response.status : err.message);
  }
}

test();
