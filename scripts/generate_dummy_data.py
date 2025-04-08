import json
from faker import Faker
import random

# Initialize Faker for generating fake data
fake = Faker()

def generate_dummy_data(num_docs=100):
    """
    Generate dummy data for Elasticsearch bulk indexing.
    Each document includes fields: title, content, author, published_date, and category.
    """
    data_lines = []
    categories = ["IT", "Health", "Sports", "Education", "Finance"]

    for i in range(num_docs):
        # Bulk API metadata line for indexing
        doc_metadata = {"index": {"_index": "dummy-index", "_id": i+1}}
        # Generate dummy document content
        doc = {
            "title": fake.sentence(nb_words=6),
            "content": fake.paragraph(nb_sentences=5),
            "author": fake.name(),
            "published_date": fake.date(),
            "category": random.choice(categories)
        }
        data_lines.append(json.dumps(doc_metadata))
        data_lines.append(json.dumps(doc))

    # Join all lines into one string with newlines
    bulk_data = "\n".join(data_lines) + "\n"

    # Write the generated data to bulk_data.json
    with open("bulk_data.json", "w") as f:
        f.write(bulk_data)
    print(f"Generated {num_docs} documents and saved to bulk_data.json")

if __name__ == "__main__":
    generate_dummy_data(100)
