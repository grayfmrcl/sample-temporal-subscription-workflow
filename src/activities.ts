import { Customer } from './types';
import { InvalidCustomerError } from './errors';
import { ApplicationFailure } from '@temporalio/workflow';

export async function sendWelcomeEmail(customer: Customer) {
  const result = `Welcome email sent to: ${customer.email}`;
  console.log(result)
  return Promise.resolve(result);
}

export async function sendTrialCancellationEmail(customer: Customer) {
  const result = `Trial cancellation email sent to: ${customer.email}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function sendSubscriptionCancellationEmail(customer: Customer) {
  const result = `Subscription cancellation email sent to: ${customer.email}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function sendSubscriptionEndedEmail(customer: Customer) {
  const result = `Subscription ended email sent to: ${customer.email}`;
  console.log(result);
  return Promise.resolve(result);
}

export async function chargeCustomer(customer: Customer) {
  const randomNum =  Math.floor(Math.random() * 10);
  if(randomNum % 2) {
    const result = `Customer ${customer.id} have been charged $${customer.initialBillingPeriodCharge}`;
    console.log(result);
    return Promise.resolve(result);
  } else {
    throw new Error('Something Went Wrong');
  }
}

export async function validateCustomer(customer: Customer) {
  if(!customer.email) {
    // throw new InvalidCustomerError('InvalidCustomerError');

    // use this to mark the error which are non-retryable
    throw ApplicationFailure.create({
      message: 'InvalidCustomerError',
      nonRetryable: true
    })
  }
}





