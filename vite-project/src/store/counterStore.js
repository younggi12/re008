import useCounterStore from "../store/counterStore";

function Counter() {
  const { count, increase, decrease } = useCounterStore();

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default Counter;