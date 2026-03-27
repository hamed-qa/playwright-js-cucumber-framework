Feature: Home Page Functionality
  As a user
  I want to verify the home page functionality
  So that I can ensure the website is working correctly



  Scenario: Search for a product
    Given I am on the home page
    When I search for "MacBook"
    Then I should see search results

  Scenario: Verify home page loads successfully
    Given I am on the home page
    Then I should see the logo