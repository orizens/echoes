Feature: Search For Playlists

  Background:
    Given I visit Echoes Player

  Scenario: Search Playlists
    When I search for "ambient music"
    And I click on the playlists button
    Then I should see playlists results

