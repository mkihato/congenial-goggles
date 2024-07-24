import { SignalWire } from "@signalwire/realtime-api";
require('dotenv').config()


const client = await SignalWire({
    project: process.env.SW_project_id,
    token: process.env.SW_token,
});

const voiceClient = client.voice;
  
try {
const call = await voiceClient.dialPhone({
    from: "+12015026577", // Must be a number in your SignalWire Space
    to: "+254705921608",
    timeout: 30,
});

console.log("The call has been answered!", call.id);
} catch (e) {
console.error(e);
}

await voiceClient.listen({
    topics: ["office"],
    onCallReceived: async (call) => {
      console.log("Call received:", call.id, call.from, call.to);
  
      try {
        await call.answer();
        console.log("Inbound call answered");
      } catch (error) {
        console.error("Error answering inbound call", error);
      }
    },
});