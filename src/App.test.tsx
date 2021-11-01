import { render } from "@testing-library/react";
import App from "./App";
import Timelinecardcomponent from "./components/timelinecard/timelinecard";

test("checks if timelinecard renders", () => {
  const { getAllByTestId } = render(<Timelinecardcomponent />);
  expect(getAllByTestId("card")).toHaveLength(1);
});

test("checks if app frame renders", () => {
  const { getAllByTestId } = render(<App />);
  expect(getAllByTestId("App")).toHaveLength(1);
});
