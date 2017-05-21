from setuptools import setup

# This is the setup/configuration file. The name of this project is
# called 'main' at the moment. The package must be equal to the name of the folder
# of the package. Our main/ folder is a package.

setup(
    name='main',
    packages=['main'],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
)
