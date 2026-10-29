from pathlib import Path

import pytest
from PIL import Image

from hba.policy import PolicyError
from hba.visual import compare_images


def png(path: Path, color: tuple[int, int, int], size=(20, 20)):
    Image.new('RGB', size, color).save(path)
    return str(path)


def test_identical_comparison_and_private_artifacts(tmp_path):
    a=png(tmp_path/'a.png', (20,30,40))
    b=png(tmp_path/'b.png', (20,30,40))
    report=compare_images(a,b,runs_dir=tmp_path)
    assert report['state']=='COMPARISON_COMPLETE'
    assert report['changed_pixel_ratio']==0
    assert report['subjective_design_review_required'] is True
    for f in report['local_artifacts'].values():
        assert Path(f).is_file()
        assert Path(f).stat().st_mode & 0o777 == 0o600


def test_different_comparison(tmp_path):
    a=png(tmp_path/'a.png', (0,0,0))
    b=png(tmp_path/'b.png', (255,255,255))
    report=compare_images(a,b,runs_dir=tmp_path)
    assert report['changed_pixel_ratio']==1
    assert report['mean_absolute_rgb_delta']==255


def test_mismatched_dimensions_stop(tmp_path):
    a=png(tmp_path/'a.png', (0,0,0))
    b=png(tmp_path/'b.png', (0,0,0),size=(21,20))
    with pytest.raises(PolicyError) as exc:
        compare_images(a,b,runs_dir=tmp_path)
    assert exc.value.code=='IMAGE_MISMATCH'


def test_reject_non_png_and_unknown_path(tmp_path):
    p=tmp_path/'bad.txt';p.write_text('x')
    for file in (str(p), str(tmp_path/'missing.png'), '../secret.pem'):
        with pytest.raises(PolicyError) as exc:
            compare_images(file,file,runs_dir=tmp_path)
        assert exc.value.code=='IMAGE_INVALID'


def test_reject_symlink(tmp_path):
    a=Path(png(tmp_path/'a.png', (0,0,0)))
    shortcut=tmp_path/'link.png';shortcut.symlink_to(a)
    with pytest.raises(PolicyError):
        compare_images(str(shortcut),str(a),runs_dir=tmp_path)


def test_reject_invalid_tolerance(tmp_path):
    a=png(tmp_path/'a.png', (0,0,0))
    for value in (-1, 81, True):
        with pytest.raises(PolicyError) as exc:
            compare_images(a,a,tolerance=value,runs_dir=tmp_path)
        assert exc.value.code=='INPUT_INVALID'
