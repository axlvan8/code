from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Training data
messages = [
    "Win a free iPhone",
    "Claim your prize now",
    "Limited time offer",
    "Hello, how are you?",
    "Let's meet tomorrow",
    "Can you send the report?",
    "Happy birthday!",
    "See you at school"
]

labels = [
    "spam",
    "spam",
    "spam",
    "not spam",
    "not spam",
    "not spam",
    "not spam",
    "not spam"
]

# Convert text into numbers
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(messages)

# Train the AI
model = MultinomialNB()
model.fit(X, labels)

print("AI is trained!")

while True:
    text = input("\nEnter a message (or type quit): ")

    if text.lower() == "quit":
        break

    data = vectorizer.transform([text])
    prediction = model.predict(data)

    print("Prediction:", prediction[0])