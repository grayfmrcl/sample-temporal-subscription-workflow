export async function sendWelcomeEmail(userEmail: string) {
  const result = `Welcome email sent to: ${userEmail}`;
  console.log(result)
  return Promise.resolve(result);
}

export async function sendTrialCancellationEmail(userEmail: string) {
  const result = `Trial cancellation email sent to: ${userEmail}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function sendSubscriptionCancellationEmail(userEmail: string) {
  const result = `Subscription cancellation email sent to: ${userEmail}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function sendSubscriptionEndedEmail(userEmail: string) {
  const result = `Subscription ended email sent to: ${userEmail}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function chargeCustomer(customerId: string, amount: number) {
  const result = `Customer ${customerId} have been charged $${amount}`;
  console.log(result);
  return Promise.resolve(result);
}



