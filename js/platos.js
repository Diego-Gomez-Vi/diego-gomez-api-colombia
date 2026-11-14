fetch("https://api-colombia.com/api/v1/TypicalDish")
  .then(response => response.json())
  .then(data => {
      console.log(data[0]);
  });