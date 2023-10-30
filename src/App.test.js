import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'; 

test('As a chef I want a database for my recipes so that I may easily refer to them.', () => {
  render(<App />);

  let recipeHeader =  screen.getByText('My Recipes') 
  expect(recipeHeader).toBeInTheDocument(); 

  let recipeList = screen.getByText('There are no recipes to list')
  expect(recipeList).toBeInTheDocument(); 

  let button = screen.getByRole('button',{name: 'Add Recipe'}); 

  expect(button).toBeInTheDocument(); 

  expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4); 
});

test("contains an add recipe button that when clicked opens a form", async () => {
  // render the landing page
  render(<App />);

  // wait for the page to load (implied, no async operations)

  // click Add Recipe button
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  // Wait for the form to appear on the screen (override the default of 1000ms as an example)
  let form = await screen.findByRole('form', undefined, {timeout:3000});

  // Verify the form appears
  expect(form).toBeInTheDocument();

  // Then I should see a form with fields: "Recipe Name" and "Recipe Instructions"
  expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();
  
  // And the "Add Recipe" button should no longer be on the screen.
  // Use queryBy instead of getBy because getBy throws an error when it doesn't have exactly 1 match
  button = screen.queryByRole('button', {name: 'Add Recipe'});
  expect(button).toBeNull();
});
