
class Person < ApplicationRecord
  API_BASE = "https://api.salesloft.com/v2"
  PAGE_SIZE = 100

  include HTTParty

  def get_people
    response = HTTParty.get(url, headers: headers)
    raise StandardError.new(response.parsed_response) unless response.success?
    data = response["data"]
    return data
  end

  def url
    "#{API_BASE}/people?per_page=#{PAGE_SIZE}"
  end

  def headers
    {
      "Authorization" => "Bearer #{ENV.fetch("SALESLOFT_API_KEY")}",
    }
  end

  person = Person.new
  person.get_people.each do |record|
    Person.create do |person|
      person.first_name = record["first_name"]
      person.last_name = record["last_name"]
      person.email_address = record["email_address"]
      person.title = record["title"]
    end
  end
end
