
export const getJobDetails = async(offset) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 10,
    "offset": offset
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };
  let responseData;
  let errorData;
  await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.text())
    .then((result)=>{responseData=result})
    .catch((error) => {errorData=error});
  console.log('!@#$ Response', responseData);
  return errorData?null:JSON.parse(responseData);
}

