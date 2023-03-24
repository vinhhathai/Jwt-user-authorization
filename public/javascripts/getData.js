function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function login() {
  var username = $("#username").val();
  var password = $("#password").val();
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/login",
    data: {
      username: username,
      password: password,
    },
    success: function (response) {
      console.log(response);
      setCookie("token", response.token, 1);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Xử lý lỗi ở đây
      console.log(textStatus + ": " + errorThrown);
    },
  });
}
