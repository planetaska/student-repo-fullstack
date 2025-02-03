const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Express Form Exercise 📋✍️</h1>
    <ul>
      <li><a href="/form">Form</a></li>
    </ul>
  `);
});

// Route to serve the form
app.get('/form', (req, res) => {
  const formHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>User Information Form</title>
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="hero min-h-screen bg-base-200 bg-blend-overlay" style="background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Join our newsletter!</h1>
                        <p class="py-6">Stay up to date with our latest news, updates, and exciting offers. Fill out the form to get started.</p>
                    </div>
                    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form class="card-body" action="/submit" method="POST">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Username</span>
                                </label>
                                <input type="text" name="username" placeholder="username" class="input input-bordered" required />
                            </div>
                            
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" class="input input-bordered" required />
                            </div>
                            
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Comments</span>
                                </label>
                                <textarea name="comments" placeholder="Your comments" class="textarea textarea-bordered" required></textarea>
                            </div>
                            
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Newsletter Subscription</span>
                                </label>
                                <div class="flex flex-col gap-2">
                                    <label class="flex items-center gap-2">
                                        <input type="radio" name="newsletter" value="yes" class="radio" required />
                                        <span>Yes, sign me up for the newsletter</span>
                                    </label>
                                    <label class="flex items-center gap-2">
                                        <input type="radio" name="newsletter" value="no" class="radio" />
                                        <span>No, thank you</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-control mt-6">
                                <button class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
  res.send(formHtml);
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  res.send(`
        <!DOCTYPE html>
        <html data-theme="light">
        <head>
            <title>Submitted Information</title>
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Thank You!</h1>
                        <div class="py-6 text-left">
                            <p class="mb-2"><span class="font-bold">Username:</span> ${formData.username}</p>
                            <p class="mb-2"><span class="font-bold">Email:</span> ${formData.email}</p>
                            <p class="mb-2"><span class="font-bold">Comments:</span> ${formData.comments}</p>
                            <p class="mb-4"><span class="font-bold">Newsletter:</span> ${formData.newsletter === 'yes' ?
                              'Yes, signed up for newsletter' :
                              'No, declined newsletter'}</p>
                            <a href="/form" class="btn btn-primary">Back to Form</a>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
  console.log(`🏃‍♀️💨 Server running at http://localhost:${port}`);
});
