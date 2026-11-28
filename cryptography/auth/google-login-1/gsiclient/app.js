window.onload = function () {
  debugger;
  google.accounts.id.initialize({
    client_id:
      "640249440952-saeo22sdb511is4309tho9m408gbjrqj.apps.googleusercontent.com",
    callback: async (response) => {
      console.log(response);
      const res = await fetch("http://localhost:3000/google/callback", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      });
      const data = await res.json();
      console.log(data);
    },
  });
  google.accounts.id.prompt();
};
