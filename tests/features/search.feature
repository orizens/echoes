Feature: Simple Search

  Background:
    Given I visit Echoes Player

  Scenario: Entering Information
    When I search for "alice in chains live"
    Then I should see 50 results

