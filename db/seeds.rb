user = User.create(
  first_name: "Hugh", 
  last_name: "Peppercorn", 
  email: "test@test.com", 
  password: "password", 
  password_confirmation: "password",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEMqIekyXIictVeZ8JUSW-d5RmsxXHdfA6WVPdh55g474N5y496A",
  admin: true
)

course = Course.create(name: "U of U Fall 2019")
3.times do
  Quiz.create(
    title: Faker::Educator.subject,
    description: Faker::TvShows::MichaelScott.quote,
    course_id: course.id
  )
end

10.times do 
  user = User.create(
    first_name: Faker::Name.first_name, 
    last_name: Faker::Name.last_name, 
    email: "test#{User.count + 1}@test.com", 
    password: "password", 
    password_confirmation: "password",
    avatar: Faker::Avatar.image,
    admin: false
  )
  Enrollment.create(role: "student", course_id: course.id, user_id: user.id)
end

Enrollment.create(role: "instructor", course_id: 1, user_id: 1)

puts "User at test@test.com created - 1 course and 10 students generated."
