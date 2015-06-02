Feature: Search For Media

  Background:
    Given I visit Echoes Player

  Scenario: Searching Videos
    When I search for "alice in chains live"
    Then I should see 50 results

  Scenario: Searching Playlists
    When I click on the playlists button
    And I search for "ambient music"
    Then I should see playlists results
