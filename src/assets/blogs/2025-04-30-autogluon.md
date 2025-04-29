---
id: autogluon
title: AutoGluon-Tabular
description: AutoGluon-Tabular - Robut and Accuracte AutoML for Structured Data
tags: [AutoML, Machine Learning, Python]
share-img: https://raw.githubusercontent.com/autogluon/autogluon/refs/heads/master/docs/_static/autogluon-logo.jpg
---

# AutoGluon-Tabular

AutoGluon-Tabular<sup>[1](#automl)</sup> is an open-source AutoML library designed to automate the process of training and tuning machine learning models for tabular data. It is part of the AutoGluon framework, which aims to make machine learning accessible to non-experts while providing state-of-the-art performance for experts.

## Why AutoML?

- Removes many of the barriers of deploying high-performance models
- Reduces the need for manual intervention when scaling to new datasets

### Issues

- Data Preprocessing: Missing values, categorical variables, and feature engineering
- Data Types: The user needs to manually specify the data types of each column

## Key Points

- Ensemble framework: Stacks multiple models
- Evaluation: Faster, more robust, and more accuracte than auto-sklearn, TPOT, and H2O AutoML
- Training Speed: Average training time of ~200 minutes on 4 hour time limit Kaggle competitions
- Repo: [AutoGluon-Tabular](https://github.com/awslabs/autogluon)

The guiding principles of AutoGluon-Tabular are:

- **Simplicity**. A user can train a model on the raw data directly without knowing the details about the data and ML models.
- **Robustness**. The framework can handle a large variety of structured datasets and ensures training succeeds even when some of the individual ML models fail.
- **Fault Tolerance**. The training can be stopped and resumed at any time. Such behavior is preferable when dealing with preemptible (spot) instances on the cloud.
- **Predictable Timing**. It returns the results within the time-budget specified by users.

### AutoGlun API

```python
from autogluon import TabularPrediction as task
predictor = task.fit("train.csv", label='class')
predictions = predictor.predict("test.csv")
```

[Framework](autogluon.mxnet.io)

### Data Preprocessing

- If the specifics of the prediction problem is left unspecified, AutoGluon will infer it based on the types of values present in the label column. Non-numeric string values indicate a classification problem, whereas numeric values with few repeats indicate a regression problem.

- Pre-processing stages:
  - Model-agnostic: transforms inputs to all models
    - Categorizing each feature numeric, text, or date/time. Uncategorized columns are dropped (e.g userIDs).
    - Text converted to n-gram features
    - Date/time converted to numeric features
  - Model-specific: only applied to a copy of the data used to train a specific model

To deal with missing discrete variables, an additional _Unseen_ category is added (for test time).

### Models

Models are run in a predefined order to ensure more reliable performant models are trained first. Some of the models used are LightGBM boosted trees<sup>[2](#lightgbm)</sup>, and CatBoost boosted trees<sup>[3](#catboost)</sup>.

Scikit-learn implementations of the following models are used:

- Random Forest
- Extremely Randomized Trees
- k-Nearest Neighbors

AutoGluon uses a far smaller set of models than other AutoML libraries, but it is still able to achieve state-of-the-art performance. AutoGluon automatically trains, tunes, and ensembles.

### Neural Network

![AutoGluon neural network](https://raw.githubusercontent.com/shirsho-12/shirsho-12.github.io/master/src/assets/img/autogluon_model.png)

The AutoGluon neural network applies three Dense blocks and connects the first and last blocks with a residual connection. Each block consists of a BatchNorm layer, a ReLU activation, and a Dropout layer. Separate embedding layers are used for each categorical feature and then concatenated.

Other important features of AutoGluon include:

- Multi-Layer stack ensembling: Multi-layer stacking feeds the predictions output by the stacker models as inputs to additional higher layer stacker models.
- Repeated k-fold bagging: randomly partitioning the data into k
  disjoint chunks (stratify based on labels), and subsequently training k copies of a model with a different data chunk held-out from each copy.

![Model stacking](https://raw.githubusercontent.com/shirsho-12/shirsho-12.github.io/master/src/assets/img/autogluon_stacking.png)

### Footnotes

<a name="automl">[1]</a> Erickson, Nick, et al. "AutoGluon-Tabular - Robut and Accuracte AutoML for Structured Data." arXiv preprint arXiv:2003.06505 (2020).

<a name="lightgbm">[2]</a> Ke, Guolin, et al. "LightGBM: A Highly Efficient Gradient Boosting Decision Tree." Advances in neural information processing systems 30 (2017).

<a name="catboost">[3]</a> Dorogush, Anna Veronika, Vasily Ershov, and Nikolai Gulin. "CatBoost: gradient boosting with categorical features support." arXiv preprint arXiv:1810.11363 (2018).
