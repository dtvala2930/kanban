import { Button } from "@hcu/libs/components/base";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    fetch("/api/users");
  });
  return (
    <div>
      <div className='bg-slate-50 text-[100px]'>Bye</div>
      <Button>Hello</Button>
    </div>
  );
}

export default App;
