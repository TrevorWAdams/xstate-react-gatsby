import React, { useEffect } from "react"
import { useMachine } from "@xstate/react"

import { statusMachine } from "../statusMachine"

const statuses = [
  {
    id: 1,
    name: "Submitted",
    state: "submitted",
    eventName: "SUBMIT",
  },
  {
    id: 2,
    name: "Started",
    state: "started",
    eventName: "START",
  },
  {
    id: 3,
    name: "Paused",
    state: "paused",
    eventName: "PAUSE",
  },
  {
    id: 4,
    name: "Completed",
    state: "completed",
    eventName: "COMPLETE",
  },
]

const serviceRequests = [
  {
    id: 1111,
    status: "SUBMIT",
  },
  {
    id: 1112,
    status: "START",
  },
  {
    id: 1113,
    status: "PAUSE",
  },
  {
    id: 1114,
    status: "COMPLETE",
  },
]

const ServiceRequest = ({ serviceRequestNumber, serviceRequestStatus }) => {
  const [current, send, service] = useMachine(statusMachine)
  const nextEvents = current.nextEvents
  const currentStatus = statuses.find(status => {
    return status.state === current.value
  })

  useEffect(() => {
    if (serviceRequestStatus) {
      service.send(serviceRequestStatus)
    }
  }, [serviceRequestStatus, service])

  const filteredStatuses = statuses.filter(
    status =>
      status.state === current.value || nextEvents.includes(status.eventName)
  )

  const handleSelected = event => {
    event.preventDefault()
    send(event.target.value)
  }

  return (
    <div
      style={{
        margin: "8px",
        padding: "8px",
        borderColor: "#cdcdcd",
        borderStyle: "solid",
        borderWidth: ".5px",
      }}
    >
      <div>Service Request #{serviceRequestNumber}</div>

      <label>
        Status:
        <select
          value={currentStatus ? currentStatus.eventName : "SUBMIT"}
          onChange={handleSelected}
        >
          {filteredStatuses &&
            filteredStatuses.map(status => (
              <option key={status.id} value={status.eventName}>
                {status.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  )
}

const ServiceRequests = () => {
  return (
    <>
      {serviceRequests &&
        serviceRequests.map(serviceRequest => (
          <ServiceRequest
            key={serviceRequest.id}
            serviceRequestNumber={serviceRequest.id}
            serviceRequestStatus={serviceRequest.status}
          />
        ))}
    </>
  )
}

const IndexPage = () => {
  return (
    <div>
      <div
        style={{
          margin: "8px",
          padding: "8px"
        }}
      >
        Work Orders
      </div>
      <hr/>
      <ServiceRequests />
    </div>
  )
}

export default IndexPage
