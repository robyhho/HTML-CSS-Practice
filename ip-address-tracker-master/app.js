let api_key = "at_rWuOSNvM9v7Psjv6NkiXKFdsdBqdc";

// fetch(
//   `https://geo.ipify.org/api/v2/country?apiKey=at_rWuOSNvM9v7Psjv6NkiXKFdsdBqdc`
// )
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   });

var ip = "8.8.8.8";

$(function () {
  $.ajax({
    url: "https://geo.ipify.org/api/v1",
    data: { apiKey: api_key, ipAddress: ip },
    success: function (data) {
      $("body").append("<pre>" + JSON.stringify(data, "", 2) + "</pre>");
    },
  });
});
