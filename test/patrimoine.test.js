import { assert } from "chai"
import { describe, it } from "mocha"
import Flux from "../models/possesions/flux.js"
import Personne from "../models/Personne.js"
import  Possession  from "../models/possesions/Possession.js"
import Argent from '../models/possesions/Argent.js'
import Patrimoine from "../models/Patrimoine.js"

const TYPE_ARGENT = {
    Courant: "Courant",
    Epargne: "Epargne",
    Espece: "Espece"
  };


describe("Test about salary evaluation", () => {

    var Ilo = new Personne("Ilo");

    it("should return 0", () => {
        
        const salary = new Flux(
            Ilo, 
            "salary", 
            1000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            3);

        assert.equal(salary.getValeur(new Date("2024-3-3")), 0);

    });

    it("should return 10_000", () => {
        const salary = new Flux(
            Ilo, 
            "salary", 
            2500,
            new Date("2024-3-3"), 
            null, 
            0, 
            4);

        assert.equal(salary.getValeur(new Date("2024-5-3")), 5000);
    });

    it("should return 2_400_000", () => {
        const salary = new Flux(
            Ilo, 
            "salary", 
            600_000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            15);

        assert.equal(salary.getValeur(new Date("2024-6-14")), 1_800_000);
    });
})


describe("Test about spending evaluation", () => {
    
    var Ilo = new Personne("Ilo");

    it("should return a -100_000", () => {
        const spending = new Flux(
            Ilo, 
            "spending", 
            -100_000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            1);

        assert.equal(spending.getValeur(new Date("2024-3-3")), 0);
    })

    it("should return -240_000", () => {
        const spending = new Flux(
            Ilo, 
            "spending", 
            -120_000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            2);

        assert.equal(spending.getValeur(new Date("2024-4-6")), -120_000);
    });
})

describe("Test about possession increasing ration :", () => {

    var Ilo = new Personne("Ilo");

    it("should return 90_000 :", () => {
        const computer = new Possession(
            "me", 
            "salary", 
            100_000, 
            new Date("2024-3-3"), 
            null, 
            10,
        );

        assert.equal(computer.getValeur(new Date("2025-3-3")), 90_000);
    })

    it('should return 95_000', () => {
        const computer = new Possession(
            "me", 
            "salary", 
            100_000, 
            new Date("2024-3-3"), 
            null, 
            10);

        assert.equal(computer.getValeur(new Date("2024-9-3")), 95_000);
    });

    it ('should return 220_000', () => {
        const savingsAccount = new Argent(
            "me", 
            "salary", 
            200_000, 
            new Date("2024-3-3"), 
            null, 
            -10,
        TYPE_ARGENT.Epargne);

        assert.equal(savingsAccount.getValeur(new Date("2025-3-3")), 220_000)
    })
})