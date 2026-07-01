const axios = require('axios');

async function test() {
  const lh3Url = "https://lh3.googleusercontent.com/gpms-cs-s/ABJJf51vpbRyVQKuCFfJac8Hzn5pI4A5NBdcH4lLTJwTIzitGC9vzMtMXYVM10oLwey1IjO1J-xXSmOJ5g7i4g2WFoZQN1IW3IRI1o15riYbJoJPMfsYMQz-0OACJ8Tfuvh5MUNP6pHuyg";
  
  try {
    const res = await axios.get(`${lh3Url}=w8192-h4096-k-no`);
    console.log("Success with 8192:", res.status);
  } catch (err) {
    console.error("Failed with 8192:", err.response ? err.response.status : err.message);
  }

  try {
    const res = await axios.get(`${lh3Url}=w16384-h8192-k-no`);
    console.log("Success with 16384:", res.status);
  } catch (err) {
    console.error("Failed with 16384:", err.response ? err.response.status : err.message);
  }
}

test();
