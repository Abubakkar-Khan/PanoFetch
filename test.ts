import axios from "axios";

const url = "https://www.google.com/maps/place/Los+Angeles,+CA,+USA/@34.009653,-118.49845,3a,75y,91.04h,95.64t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIC61uWOrwE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FABJJf53fjA1ML6JsgBbReovoSvfk4Bh9FkY6UBm30NkwGsyf-w-fgdD--K1Yc8NOKFg0OD17PMey-KUkLoqlQ9cIMmU1V1s19tfYrq4SuLWkmUPP9U7EUPxKcsNrQv1DN39UrAXyUppDGw%3Dw900-h600-k-no-pi-5.644034187905319-ya91.04010585917226-ro0-fo100!7i14000!8i7000!4m6!3m5!1s0x80c2c75ddc27da13:0xe22fdf6f254608f4!8m2!3d34.0549076!4d-118.242643!16s%2Fm%2F030qb3t?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D";

axios.post('http://localhost:3000/api/download', { url })
  .then(res => console.log("SUCCESS:", res.data))
  .catch(err => console.error("ERROR:", err.response?.data || err.message));
