# Car register

**[FR] Functional requirements**
Must be possible to create a new car registry
Must be possible to list all categories

**[BR] Business rules**
Shouldn't be possible to register a car with a license plate already in use
Shouldn't be possible to update a license place of a car already registered
Car availability default value should be true
Only admin user must be able to register cars

# Car list

**[FR] Functional requirements**
Must be possible to list all available cars
Must be possible to list all available cars ordered by category name
Must be possible to list all available cars ordered by brand
Must be possible to list all available cars ordered by model

**[NFR] Non-functional requirements**

**[BR] Business rules**
There's no need for user to be logged in to list cars

# Cars specs registry

**[FR] Functional requirements**
Must be possible to register the specs of a car
Must be possible to list all the specs

**[BR] Business rules**
Shouldn't be able to register spec for a non-registered car
Shouldn't be able twice a the same spec for a car
Only admin user must be able to register specs

# Add images for the cars

**[FR] Functional requirements**
Must be possible to add images to the cars
Must be possible to list all cars

**[RF] Requisitos não funcional**
Must use mutter to upload files

**[BR] Business rules**
User should be able to attach multiple images to a car
Only admin user must be able to upload and attach images

# Car Rental

**[FR] Functional requirements**
Must be possible to create a rental

**[BR] Business rules**
All rentals must last at least 24 hours
A user shouldn't be able to rent 2 cars at the same time
A car already rented can't have another rental for the same date
