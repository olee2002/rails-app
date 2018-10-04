class Api::PeopleController < Api::BaseController
    respond_to :json
  
    def index
        @people = Person.all
        # paginate(:page => params[:page], :per_page => 20)
        render json: @people
      end 
  end