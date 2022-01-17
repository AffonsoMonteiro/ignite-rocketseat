import { query as q } from 'faunadb' 

import { fauna } from './../../../services/fauna';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  console.log(subscriptionId, customerId);
  // Buscar usuario no banco do fauna
  const useRef = await fauna.query(
    q.Get(
      q.Match(
        q.Index('user_by_stripe_customer_id'),
        customerId
      )
    )
  )

  //Salvar os dados da subscription no faunadb
}