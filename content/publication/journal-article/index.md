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
publication: In IEEE Transactions on Neural Networks and Learning Systems 
publication_short: In TNNLS

abstract: Point cloud-based 3-D object detection is a significant and critical issue in numerous applications. While most existing methods attempt to capitalize on the geometric characteristics of point clouds, they neglect the internal semantic properties of point and the consistency between the semantic and geometric clues. We introduce a semantic consistency (SC) mechanism for 3-D object detection in this article, by reasoning about the semantic relations between 3-D object boxes and its internal points. This mechanism is based on a natural principle, the semantic category of a 3-D bounding box should be consistent with the categories of all points within the box. Driven by the SC mechanism, we propose a novel SC network (SCNet) to detect 3-D objects from point clouds. Specifically, the SCNet is composed of a feature extraction module, a detection decision module, and a semantic segmentation module. In inference, the feature extraction and the detection decision modules are used to detect 3-D objects. In training, the semantic segmentation module is jointly trained with the other two modules to produce more robust and applicable model parameters. The performance is greatly boosted through reasoning about the relations between the output 3-D object boxes and segmented points. The proposed SC mechanism is model-agnostic and can be integrated into other base 3-D object detection models. We test the proposed model on three challenging indoor and outdoor benchmark datasets  

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

url_pdf: 'https://ieeexplore.ieee.org/abstract/document/10365583'
url_code: ''
url_poster: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: ''
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

- It proposes a framework that integrates semantic segmentation of point clouds to train the 3D object detection model and thus enhance its performance.
- It proposes a semantic consistency mechanism and a corresponding loss function that regulate the relationships between predicted 3D boxes and internal points.
- It implements and tests the consistency mechanism on three different 3D detectors to prove its universality.
- The model achieves better results than comparison studies on three challenging datasets. The effectiveness of the approach is verified with ablation studies.

