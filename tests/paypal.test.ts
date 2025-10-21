import { generateAccessToken, paypal } from "../lib/paypal";

// Test to generate access token from paypal
test("generates token from paypal", async () => {
  const token = await generateAccessToken();
  console.log("Token", token);
  expect(typeof token).toBe("string");
  expect(token.length).toBeGreaterThan(0);
});

// Test to create a paypal order
test("creates a paypal order", async () => {
  const price = 10.0;

  const order = await paypal.createOrder(price);
  console.log("Order", order);

  expect(order).toHaveProperty("id");
  expect(order).toHaveProperty("status");
  expect(order.status).toBe("CREATED");
});

// Test to capture payment with mock order
test("simulate capturing a payment from an", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const capturedPayment = await paypal.capturePayment(orderId);
  console.log("Captured Payment", capturedPayment);

  expect(capturedPayment).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});
