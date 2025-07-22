import { describe } from "node:test";
import { CoffeePreparationsService } from "../src/features/coffee-preparations/coffee-preparations.service";
import { CoffeePreparation, CreateCoffeePreparationRequest } from "../src/types";

// Mock Supabase
jest.mock("../src/config/supabase", () => {
  const mockChain: any = {
    from: jest.fn(() => mockChain),
    select: jest.fn(() => mockChain),
    eq: jest.fn(() => mockChain),
    order: jest.fn(() => mockChain),
    insert: jest.fn(() => mockChain),
    update: jest.fn(() => mockChain),
    delete: jest.fn(() => mockChain),
    single: jest.fn(() => mockChain),
    data: null,
    error: null,
  };

  return {
    supabase: mockChain,
  };
});

const { supabase: mockSupabase } = require("../src/config/supabase");

describe("CoffeePreparationsService", () => {
  let coffeePreparationsService: CoffeePreparationsService;
  const mockPreparation: CoffeePreparation = {
    id: "1",
    user_id: "user@test.com",
    coffee_id: "coffee1",
    method_dictionary_id: "method1",
    temperature_dictionary_id: "temp1",
    ratio_dictionary_id: "ratio1",
    ranking: 4.5,
    notes: ["fruity", "sweet"],
    comments: "Great preparation",
    created_at: "2023-01-01",
  };

  beforeEach(() => {
    coffeePreparationsService = new CoffeePreparationsService();
    jest.clearAllMocks();
  });

  describe("getByUserId", () => {
    it("should return preparations by user ID", async () => {
      mockSupabase.data = [mockPreparation];
      mockSupabase.error = null;

      const result = await coffeePreparationsService.getByUserId("user@test.com");

      expect(mockSupabase.from).toHaveBeenCalledWith("coffee_preparations");
      expect(mockSupabase.eq).toHaveBeenCalledWith("user_id", "user@test.com");
      expect(mockSupabase.order).toHaveBeenCalledWith("created_at", { ascending: false });
      expect(result).toEqual([mockPreparation]);
    });

    it("should filter by coffee_id when provided", async () => {
      mockSupabase.data = [mockPreparation];
      mockSupabase.error = null;

      await coffeePreparationsService.getByUserId("user@test.com", "coffee1");

      expect(mockSupabase.eq).toHaveBeenCalledWith("coffee_id", "coffee1");
    });

    it("should throw error when database operation fails", async () => {
      mockSupabase.error = new Error("Database error");

      await expect(coffeePreparationsService.getByUserId("user@test.com")).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("create", () => {
    const newPreparation: CreateCoffeePreparationRequest = {
      user_id: "user@test.com",
      coffee_id: "coffee1",
      method_dictionary_id: "method1",
      temperature_dictionary_id: "temp1",
      ratio_dictionary_id: "ratio1",
      ranking: 4.5,
      notes: ["fruity", "sweet"],
      comments: "Great preparation",
    };

    it("should create preparation successfully", async () => {
      mockSupabase.data = mockPreparation;
      mockSupabase.error = null;

      const result = await coffeePreparationsService.create(newPreparation);

      expect(mockSupabase.insert).toHaveBeenCalledWith([newPreparation]);
      expect(mockSupabase.select).toHaveBeenCalled();
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(mockPreparation);
    });

    it("should throw error when creation fails", async () => {
      mockSupabase.error = new Error("Creation failed");

      await expect(coffeePreparationsService.create(newPreparation)).rejects.toThrow(
        "Creation failed"
      );
    });
  });
});
