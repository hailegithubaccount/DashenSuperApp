import React from "react";
import PinScreen from "../Components/page";

export default function PinPage({navigation}) {
  return (
    <PinScreen
      title="Create PIN"
      introTitle="You are almost finished"
      introSub="You're just one step away! Set up your secure PIN to complete the setup and access your account."
      pinTitle="Create New PIN"
      pinSub="Set up a secure PIN for your account access."
      buttonText="Continue"
      onSubmit={() => navigation.navigate("Confirm")}
    />
  );
}