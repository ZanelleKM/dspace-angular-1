from typing import List, Union
from pydantic import BaseModel
from fastapi import FastAPI, Query, Request
from fastapi.templating import Jinja2Templates
import json
import yaml
from fastapi.staticfiles import StaticFiles





templates = Jinja2Templates(directory="template")
class Metadata(BaseModel):
    generate : str
    upgrade : str
    Community : str
    Collections : str
    Resource : str
    Title : Union[List[str], None]
    fname : str
    lname : str
    Initials : str
    Affiliation : str
    Email : str
    ORCHID : str
    files : str
    Abstract : Union[List[str], None]
    Published_date : str
    Location : str
    paperLink : str
    array : List[str]

    


app = FastAPI()
app.mount("/images", StaticFiles(directory="images"), name="images")
@app.get("/")



async def read_items(request: Request,generate = Query(default=None),
            upgrade1 = Query(default=None),
            Community = Query(default=None),
            Collections = Query(default=None),
            Resource  = Query(default=None),
            Title = Query(default=None),
            fname = Query(default=None),
            lname = Query(default=None),
            Initials = Query(default=None),
            Affiliation = Query(default=None),
            Email = Query(default=None),
            ORCHID = Query(default=None),
            files = Query(default=None),
            Abstract = Query(default=None),
            Published_date = Query(default=None),
            Location = Query(default=None),
            array =  Query(default=None),
            paperLink =  Query(default=None)):
    templates = Jinja2Templates(directory="template")
    query_items={"data":
                  {"type": "dois",
                  "attributes":
                    {"event": "draft",
                    "prefix": '10.48479',
                    "DOI" : upgrade1,
                    "creators":
                      {"name": array},
                    "lastnameFirstAuthor": lname,
                    "dataReleaseDate": Published_date,
                    "titles":
                      {"Title": Title},
                    "paperLink": paperLink,
                    "publisher": "South African Radio Astronomy Observatory",
                    "descriptions": Abstract,
                    "publicationYear": 2023,
                    "version": 1.0,
                    "types":
                      {"resourceTypeGeneral": Resource},
                    "url": 'https://schema.datacite.org/meta/kernel-4.0/index.html',
                    "schemaVersion": 'http://datacite.org/schema/kernel-4'}}}
    #query_items = {"Generate" : Generate,
        #    "DOI" : DOI,
        #    "Community" : Community,
        #    "Collections" : Collections,
        #    "Resource" : Resource,
        #    "Title" : Title,
        #    "Firstname" : Firstname,
        #    "Lastname" : Lastname,
        #    "Initials" : Initials,
        #    "Affiliation" : Affiliation,
        #    "Email" : Email,
        #    "ORCHID" : ORCHID,
        #    "AuthorFile" : AuthorFile,
        #    "Abstract" : Abstract,
        #    "Publisheddate" : Publisheddate,
        #    "Path" : Path}
    # Serializing json
    json_object = json.dumps(query_items, indent=4)
    query_params = dict(request.query_params)
    html = """
    <html>
    <head>
        <title>Popup Message</title>
    </head>
    <body>
        <script>
            alert("Hello from Python!");
        </script>
    </body>
    </html>
      """

    # Writing to sample.json
    with open("metadata.json", "w") as outfile:
        outfile.write(json_object)
    with open("metadata.json", "r") as json_string:
      json_data = json.load(json_string)
      with open("metadata.yaml","w") as yaml_data:
          yaml.dump(json_data, yaml_data, default_flow_style=False)
          print("YAML file saved.")

    return templates.TemplateResponse("submit.html", {"request": request})