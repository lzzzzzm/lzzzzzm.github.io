---
title: 'Semantic consistency reasoning for 3-D object detection in point clouds'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - Wenwen Wei
  - Ping Wei*
  - admin
  - Jialu Qin
  - Xiang Cheng
  - Meiqin Liu
  - Nanning Zheng

# Author notes (optional)
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'

date: '2023-12-19T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-12-19T00:00:00Z'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: In *IEEE Transactions on Neural Networks and Learning Systems *
publication_short: In *TNNLS*

abstract: Point cloud-based 3-D object detection is a significant and critical issue in numerous applications. While most existing methods attempt to capitalize on the geometric characteristics of point clouds, they neglect the internal semantic properties of point and the consistency between the semantic and geometric clues. We introduce a semantic consistency (SC) mechanism for 3-D object detection in this article, by reasoning about the semantic relations between 3-D object boxes and its internal points.

# Summary. An optional shortened abstract.
summary: 

tags:
  - 3D Object Detection

# Display this page in the Featured widget?
featured: false

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: ''
url_code: 'https://github.com/lzzzzzm/STCOcc'
url_poster: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'CVPR2025 Poster'
  focal_point: ''
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

Our main contribution:

- We introduce an explicit state-based modeling approach designed to renovate the 3D features both spatially and temporally.
- We propose a sparse, occlusion-aware mechanism that provides more accurate geometric 3D features. Additionally, we propose a novel sparse-based method for modeling long-term dynamic information. This approach not only reduces computational costs but also ensures spatial consistency.
- Our method achieves a RayIoU of 41.7% on Occ3D and a RayIoU of 40.8% along with a mAVE of 0.44 for occupancy and scene flow prediction on OpenOcc, while also reducing the training memory usage to 8.7GB.

