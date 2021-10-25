import React from "react";
import styles from "./style.module.css";
import img from "../../public/playground_assets/testing.png";
import { Subject } from "https://jspm.dev/subjecto";

console.log(Subject);

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <img src={img} alt="Testing image" />
        <div className={styles.testing}>Hello</div>
        <img src="/playground_assets/testing.png" alt="Testing" />
      </div>
    );
  }
}

export default App;
