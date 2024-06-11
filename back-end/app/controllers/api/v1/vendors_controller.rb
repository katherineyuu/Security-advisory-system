module Api
    module V1
      class VendorsController < ApplicationController
        def index
          vendors = Vendor.all
          render json: vendors
        end
  
        def create
          vendor_name = params[:name]
          vendor_data = FetchCVEDataService.fetch_vendor(vendor_name)
  
          if vendor_data
            vendor = Vendor.find_or_create_by(vendor_id: vendor_data[:vendor_id]) do |v|
              v.name = vendor_data[:name]
            end
  
            if vendor.persisted?
              # Fetch and add CVEs for the vendor
              FetchCVEDataService.call(vendor.name)
              render json: { status: 'SUCCESS', message: 'Vendor and CVEs added', data: vendor }, status: :ok
            else
              render json: { status: 'ERROR', message: 'Vendor not added', data: vendor.errors }, status: :unprocessable_entity
            end
          else
            render json: { status: 'ERROR', message: 'Vendor not found in external service' }, status: :not_found
          end
        end
  
        def destroy
          vendor = Vendor.find_by(name: params[:name])
          if vendor
            vendor.destroy
            render json: { status: 'SUCCESS', message: 'Vendor deleted' }, status: :ok
          else
            render json: { status: 'ERROR', message: 'Vendor not found' }, status: :not_found
          end
        end
      end
    end
  end
  