const { data } = require("jquery");

function addToCart(productId) {
  $.ajax({
    url: "/add-to-cart",
    method: "post",
    dataType: "json",
    data: { productId: productId },
    beforeSend: function () {
      // Show image container
      $("#loader").show();
    },
    success: function (response) {
      $("#cartDiv").load(location.href + " #cartDiv>*", "");
      setTimeout(function () {
        $("#loader").hide();
      }, 5000);
    },
    error: function (response) {
      alert("server error occured");
    },
  });
}

function removeFromCart(productId) {
  $.ajax({
    url: "/remove-from-cart",
    method: "post",
    dataType: "json",
    data: { productId: productId },
    success: function (response) {
      if (response.msg == "success") {
        // alert('data deleted');
        $("#cartDiv").load(location.href + " #cartDiv>*", "");
      } else {
        // alert('data not get deleted');
      }
    },
    error: function (response) {
      //  alert('server error')
    },
  });
}

function removeFromCartPage(productId) {
  $.ajax({
    url: "/remove-from-cart",
    method: "post",
    dataType: "json",
    data: { productId: productId },
    beforeSend: function () {
      // Show image container
      $("#loader").show();
    },
    success: function (response) {
      $("#cartDiv").load(location.href + " #cartDiv>*", "");
      $("#cartSection").load(location.href + " #cartSection>*", "");
      setTimeout(function () {
        $("#loader").hide();
      }, 5000);
    },
    error: function (response) {
      //  alert('server error')
    },
  });
}

function removeFromWishlistPage(productId) {
  $.ajax({
    url: "/remove-from-wishlist",
    method: "post",
    dataType: "json",
    data: { productId: productId },
    beforeSend: function () {
      // Show image container
      $("#loader").show();
    },
    success: function (response) {
      $("#cartDiv").load(location.href + " #cartDiv>*", "");
      $("#wishlistDiv").load(location.href + " #wishlistDiv>*", "");
      setTimeout(function () {
        $("#loader").hide();
      }, 5000);
    },
    error: function (response) {
      //  alert('server error')
    },
  });
}

function addToWishlist(productId) {
  $.ajax({
    url: "/add-to-wishlist",
    method: "post",
    dataType: "json",
    data: { productId: productId },

    success: function (response) {},
    error: function (response) {
      alert("server error occured");
    },
  });
}

function updateCart(cartId) {
  const quantity = $("#quantity1").val();

  console.log(quantity);
  $.ajax({
    url: "/updateCart",
    method: "post",
    dataType: "json",
    data: {
      cartId: cartId,
      quantity: quantity,
    },
    beforeSend: function () {
      $("#loader").show();
    },
    success: function (response) {
      $("#subtotal").load(location.href + " #subtotal>*", "");
      $("#cartDiv").load(location.href + " #cartDiv>*", "");
      setTimeout(function () {
        $("#loader").hide();
      }, 5000);
    },
    complete: function () {},
    error: function (response) {
      alert("server error occured");
    },
  });
}

function openSingleProductPage(productId) {
  $.ajax({
    url: "/product-single",
    method: "get",
    dataType: "json",
    data: { productId: productId },
    success: function (response) {},
    error: function (response) {
      alert("server error occured");
    },
  });
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function displayRazorpay() {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const data = await fetch("https://amrutras.herokuapp.com/razorpay", {
    method: "POST",
  }).then((t) => t.json());

  console.log(data);

  const options = {
    key: "rzp_test_oQDj1SlU1kKC5P",
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: "Amrutras",
    description: "Thank you for choosing Amrutras",
    handler: function (response) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      $("#placeOrder").show();
      $("#successGIF").show();
      $("#paymentButton").hide();
      $.ajax({
        url: "/create-order",
        method: "post",
        dataType: "json",
        beforeSend: function () {
          $("#loader").show();
        },
        success: function (response) {
          setTimeout(function () {
            $("#loader").hide();
          });
        },
        error: function (response) {
          alert("server error occured");
        },
      });
      window.location.replace("https://amrutras.herokuapp.com/checkout-review");
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
