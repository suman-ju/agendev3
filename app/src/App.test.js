import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('edits a task without adding a duplicate', () => {
  render(<App />);

  const task = screen.getByText('Plan the day').closest('li');
  fireEvent.click(within(task).getByRole('button', { name: 'Edit' }));

  const editInput = screen.getByRole('textbox', { name: 'Edit Plan the day' });
  expect(editInput).toHaveValue('Plan the day');
  fireEvent.change(editInput, { target: { value: 'Plan the week' } });
  fireEvent.click(within(task).getByRole('button', { name: 'Save' }));

  expect(screen.getByText('Plan the week')).toBeInTheDocument();
  expect(screen.queryByText('Plan the day')).not.toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('cancel discards edits and add and delete still work', () => {
  render(<App />);

  const task = screen.getByText('Check emails').closest('li');
  fireEvent.click(within(task).getByRole('button', { name: 'Edit' }));
  fireEvent.change(screen.getByRole('textbox', { name: 'Edit Check emails' }), {
    target: { value: 'Changed title' },
  });
  fireEvent.click(within(task).getByRole('button', { name: 'Cancel' }));
  expect(screen.getByText('Check emails')).toBeInTheDocument();
  expect(screen.queryByText('Changed title')).not.toBeInTheDocument();

  fireEvent.click(within(task).getByRole('button', { name: 'Delete Check emails' }));
  fireEvent.change(screen.getByRole('textbox', { name: 'New task' }), {
    target: { value: 'Read a book' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Add task' }));

  expect(screen.getByText('Read a book')).toBeInTheDocument();
  expect(screen.queryByText('Check emails')).not.toBeInTheDocument();
});
