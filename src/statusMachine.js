import { Machine } from "xstate"

export const statusMachine = Machine({
         id: "status",
         initial: "serviceRequest",
         states: {
           serviceRequest: {
             on: {
               SUBMIT: {
                 target: "submitted",
               },
               START: {
                 target: "started",
               },
               PAUSE: {
                 target: "paused",
               },
               COMPLETE: {
                 target: "completed",
               },
             },
           },
           submitted: {
             on: {
               START: {
                 target: "started",
                 actions: ["start"],
               },
             },
           },
           started: {
             on: {
               COMPLETE: {
                 target: "completed",
                 actions: ["complete"],
               },
               PAUSE: {
                 target: "paused",
                 actions: ["pause"],
               },
             },
           },
           paused: {
             on: {
               START: {
                 target: "started",
                 actions: ["start"],
               },
             },
           },
           completed: {
             type: "final",
             actions: ["complete"],
           },
         },
       })
