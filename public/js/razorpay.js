import { data } from "jquery";
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
    key: "rzp_test_nxnL1FFdKlYCx1",
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: "Amrutras",
    description: "Thank you for choosing Amrutras",
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
      $("#successGIF").show();
      $("#paymentButton").hide();
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
