import { stripe } from './../../../services/stripe';
import { query as q } from 'faunadb' 

import { fauna } from './../../../services/fauna';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // Buscar usuario no banco do fauna
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)        

  //Salvar os dados da subscription no faunadb
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,

  }

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}