import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import { useFeedback } from '../hooks/feedback'
import axiosInstance from '../axios-instance'


// A form for verifying a pesapal transaction after the user has paid. It gets the OrderTrackingId from the url and sends it to the backend for verification. Use TailwindCSS for styling.
const VerifyTransaction = () => {
  const location = useLocation()
  const [orderTrackingId, setOrderTrackingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const { toggleFeedback } = useFeedback()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const orderTrackingId = params.get('OrderTrackingId')
    setOrderTrackingId(orderTrackingId)
  }, [location])

  async function verifyTransaction() {
    if (!orderTrackingId) {
      setError(true)
      setMessage("Invalid Transaction")
      toggleFeedback("error", {
        title: "Error",
        text: "Invalid Transaction",
      })
      return
    }
    try {
      setLoading(true)
      const response = await axiosInstance.post('/transaction/verify', {
        order_id: orderTrackingId,
      })

      const { status, payload } = response.data

      if (status) {
        if (payload.status_code === 1) {
          setLoading(false)
          setError(false)
          setMessage("Transaction successfully verified. You can close The Page")
          toggleFeedback("success", {
            title: "Success",
            text: "Transaction successfully verified",
          })
        } else {
          setLoading(false)
          setError(true)
          setMessage("Transaction not verified. Please try again later")
          toggleFeedback("error", {
            title: "Error",
            text: "Transaction not verified. Please try again later",
          })
        }
      } else {
        setLoading(false)
        setError(true)
        setMessage("Transaction not verified. Please try again later")
        toggleFeedback("error", {
          title: "Error",
          text: "Transaction not verified. Please try again later",
        })
      }

    } catch (error) {
      setLoading(false)
      setError(true)
      setMessage(error.message)
      toggleFeedback("error", {
        title: "Error",
        text: error.message,
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Verify Transaction</h1>
        <p className="text-sm text-gray-400">Verify your transaction by clicking the button below.</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        {
          loading ? <div className='loader2'></div> : <Button onClick={verifyTransaction} value={"Verify Transaction"} />
        }

        {error && <p className="text-sm text-red-400">{message}</p>}
        {!error && !loading && <p className="text-sm text-green-400">{message}</p>}
      </div>
    </div>
  )
}

export default VerifyTransaction