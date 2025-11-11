import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import FoodForm from "../components/FoodForm";
import { http, HttpResponse } from "msw";
import server from "../test/server";
import { vi } from "vitest";

const mockOnSubmit = vi.fn();
const mockOnCancel = vi.fn();

describe("FoodForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders form with all input fields", () => {
    render(
      <Provider store={store}>
        <FoodForm mode="add" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/enter food name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter food rating/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter food image url/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/restaurant name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter restaurant logo url/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /restaurant status/i })).toBeInTheDocument();
  });

  test("shows validation errors for empty required fields", async () => {
    render(
      <Provider store={store}>
        <FoodForm mode="add" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </Provider>,
    );

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/food name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/food rating must be a number/i)).toBeInTheDocument();
      expect(screen.getByText(/food image url is required/i)).toBeInTheDocument();
      expect(screen.getByText(/restaurant name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/restaurant logo url is required/i)).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <Provider store={store}>
        <FoodForm mode="add" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/enter food name/i), {
      target: { value: "Pizza" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter food rating/i), {
      target: { value: "4.5" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter food image url/i), {
      target: { value: "https://example.com/pizza.jpg" },
    });
    fireEvent.change(screen.getByPlaceholderText(/restaurant name/i), {
      target: { value: "Pizza Place" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter restaurant logo url/i), {
      target: { value: "https://example.com/logo.jpg" },
    });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          food_name: "Pizza",
          food_rating: 4.5,
          food_image: "https://example.com/pizza.jpg",
          restaurant_name: "Pizza Place",
          restaurant_logo: "https://example.com/logo.jpg",
          restaurant_status: "Open Now",
        }),
      );
    });
  });

  test("shows error for invalid rating range", async () => {
    render(
      <Provider store={store}>
        <FoodForm mode="add" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
      </Provider>,
    );

    // Fill required fields first
    fireEvent.change(screen.getByPlaceholderText(/enter food name/i), {
      target: { value: "Pizza" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter food image url/i), {
      target: { value: "https://example.com/pizza.jpg" },
    });
    fireEvent.change(screen.getByPlaceholderText(/restaurant name/i), {
      target: { value: "Pizza Place" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter restaurant logo url/i), {
      target: { value: "https://example.com/logo.jpg" },
    });

    const ratingInput = screen.getByPlaceholderText(/enter food rating/i) as HTMLInputElement;
    // Remove max attribute to allow HTML5 to pass, but Zod will still validate
    ratingInput.removeAttribute("max");
    fireEvent.change(ratingInput, { target: { value: "6" } });

    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/food rating must be between 1 and 5/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});

