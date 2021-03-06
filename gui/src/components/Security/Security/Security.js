import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import axios from "../../../axios/finnhub/quote";
import styles from "./Security.module.css";
import Button from "../../UI/Button/Button";

const initialState = {
  test: true,
};

const SecurityContext = createContext();
const { Provider } = SecurityContext;
const Security = ({ symbol, clicked, children }) => {
  const [tickerData, setTickerData] = useState(initialState);
  useEffect(() => {
    const getTickerData = async () => {
      const res = await axios.get(`quote?symbol=${symbol}`);
      setTickerData(res);
      console.log(res);
    };
    getTickerData();
  }, [symbol]);

  const memoizedValue = useMemo(
    () => ({
      ...tickerData,
    }),
    [tickerData]
  );
  return (
    <Provider value={memoizedValue}>
      <div className={styles.Container}>
        <div className={styles.Symbol}>
          <h5>{symbol}</h5>
        </div>
        <div className={styles.Delete} onClick={() => clicked()}>
          <strong>X</strong>
        </div>
        <div className={styles.TickData}>{children}</div>
      </div>
    </Provider>
  );
};

const ChartBtn = ({ userStyles = {}, history }) => {
  const { data } = useContext(SecurityContext);
  console.log(data);
  const chartRedirect = () => {
    history.push(`/chart/AAPL`);
  };
  return <Button clicked={chartRedirect}>Chart</Button>;
};

const FundamentalsBtn = ({ userStyles = {}, history }) => {
  return <Button>Fundamentals</Button>;
};

Security.ChartBtn = ChartBtn;
Security.FundamentalsBtn = FundamentalsBtn;

export default Security;
