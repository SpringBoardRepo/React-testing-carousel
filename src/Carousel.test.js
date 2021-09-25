import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import Card from "./Card";


//Smoke Test
test("Should work without crashing component", function () {
  render(<Carousel />);
});

test("Should work without crashing component", function () {
  render(<Card />);
});


//Snapshot Test
test("it matches snapshot for carousel component", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

test("it matches snapshot for card component", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
})

//For left arrow

test("works when you click on the left arrow", () => {

  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // expect the first image to show , but not second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move to the right and expect the second image to show , but not first
  fireEvent.click(rightArrow);
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move to the left and expect the pevious image to show
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})


// For right arrow
it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// For both arrows
test("hide and show works appropitaly", () => {
  const { getByTestId } = render(<Carousel />);


  const leftArrowIcon = getByTestId("left-arrow");
  const rightArrowIcon = getByTestId("right-arrow");

  //on the main page when left arrow is missing
  expect(leftArrowIcon).toHaveClass("hidden");
  expect(rightArrowIcon).not.toHaveClass("hidden");

  // fired a event on right arrow and expecting both arrows shows
  fireEvent.click(rightArrowIcon);

  expect(leftArrowIcon).not.toHaveClass("hidden");
  expect(rightArrowIcon).not.toHaveClass("hidden");

  //Again fired a event on right arrow and expect right arrow is hiddden
  fireEvent.click(rightArrowIcon);

  expect(leftArrowIcon).not.toHaveClass("hidden");
  expect(rightArrowIcon).toHaveClass("hidden");
})

