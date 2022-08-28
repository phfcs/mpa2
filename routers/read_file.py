from traceback import print_exc
from fastapi import UploadFile, APIRouter

from internal.read_file import read_logs, get_logs
from internal import read_file

router = APIRouter(
    prefix="/bob/Upload", #rota a ser definida pelo
    tags=['read file'],
    responses={404: {"Bob: read file": "Not found"}}
)

@router.put("/csv")
async def upload_csv(file: UploadFile):
    try:
        read_logs(file.file)
        r = True
    except:
        print_exc()
        r = False
    return r

@router.get("/check")
async def check_logs(n: int):
    return get_logs()[n]