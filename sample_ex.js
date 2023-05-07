//Writing all code in one go

import React from "react";
import ReactDOM from "react-dom";
import World from "./components/World";
import "./styles.css";

function App() {
  return  <><p>fadfasfasfsadfasfas</p><World  /></>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);




import React, { Suspense } from 'react';
import ErrorBoundary from './Error'
import  DataComponent  from './ChildComponent';
import LoadingComponent from './LoadingComponent';

const ParentComponent = () => (
  
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
  <Suspense fallback={<LoadingComponent />}>
    <DataComponent />
   
  </Suspense>
   </ErrorBoundary>


);

export default ParentComponent;



import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;





import React from 'react';

const LoadingComponent = () => {
  return <>Loading................</>;
};
export default LoadingComponent;





import React from 'react';

const fetchData = async () => {
  
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await response.json();
    await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 1 second
    return json;
  
};

const DataComponent = React.lazy(() =>
  fetchData().then(data => ({
    default: () => <ChildComponent data={data} />
  }))
);

const ChildComponent = ({ data }) => (
  <div>
    {data.userId}
  </div>
);

export default DataComponent;
